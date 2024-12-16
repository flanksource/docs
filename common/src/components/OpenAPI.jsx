
import Details from "@theme/Details";
const resolveRef = (schema, ref) => {
  const path = ref.replace(/^#\//, '').split('/');
  return path.reduce((acc, part) => acc && acc[part], schema);
};


const description = (content) => {
  // Convert markdown links [text](url) to <a> elements
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  return <span dangerouslySetInnerHTML={{
    __html: content.replace(markdownLinkRegex, '<a href="$2"  class="text-blue-500 hover:underline">$1</a>')
  }} />
}

const OpenAPISchema = ({ schema, rootSchema }) => {
  if (!schema) {
    return <div className="text-red-500">No schema provided</div>;
  }



  const getRef = (schema, parent, key) => {
    if (!schema.$ref) {
      return null
    }
    // Resolve reference
    const resolvedSchema = resolveRef(rootSchema, schema.$ref);
    if (resolvedSchema != null) {
      return null;
    }
    const url = URL.parse(schema.$ref)
    const refParts = schema.$ref.split('/')
    let label = refParts[refParts.length - 1]

    if (label == "values.schema.json" || label == "values.schema.deref.json") {
      // use the {github repo name} as the label
      const parts = url.pathname.split('/')
      label = parts[2]
    }
    return <a href={schema.$ref} target="_blank" className="text-blue-500 hover:underline">{label}</a>
  }

  const renderSchema = (schema, parent, key) => {
    if (!schema) {
      console.log("cannot find schema", schema, parent, key)
      return null;
    }
    if (schema.$ref) {
      // Resolve reference
      const resolvedSchema = resolveRef(rootSchema, schema.$ref);
      if (resolvedSchema == null) {
        const url = URL.parse(schema.$ref)
        const refParts = schema.$ref.split('/')
        let label = refParts[refParts.length - 1]

        if (label == "values.schema.json" || label == "values.schema.deref.json") {
          // use the {github repo name} as the label
          const parts = url.pathname.split('/')
          label = parts[2]
        }
        return <a href={schema.$ref} target="_blank" className="text-blue-500 hover:underline">{label}</a>
      }
      return renderSchema(resolvedSchema, parent);
    }
    if (schema.$def) {
      // Resolve $def reference
      const resolvedSchema = rootSchema.$defs?.[schema.$def] || rootSchema.definitions?.[schema.$def];
      return renderSchema(resolvedSchema, parent);
    }

    for (let item in schema.properties) {
      if (!parent) {
        continue
      }
      if (typeof (parent.required) == 'function') {
        schema.properties[item].required = parent.required.includes(item)
      }
    }

    if (schema.type === 'object') {
      return (
        <div className="border pl-2 rounded-lg ">

          {/* {schema.title && <h4 className="font-bold">{schema.title}</h4>} */}
          {schema.description && !schema.description.includes("yaml-language-server:") && <p className="text-sm text-gray-600 mb-2">{description(schema.description)}</p>}
          <ul className="list-disc pl-5">
            {Object.entries(schema.properties || {}).map(([key, value]) => (
              <li key={key} className="mb-1">
                <span className="font-semibold">
                  {key}
                  {value.type === 'array' && "[]"}
                  {/* {parent && parent.required !== null  && parent.required.includes(key) && <span className="text-red-500">*</span>} */}
                  {/* {value.required  && <span className="text-red-500">*</span>} */}
                </span>
                : {renderSchema(value, schema, key || schema.title)}
                {value.description && <span className="text-gray-600 description"> - {description(value.description)}</span>}
                {/* {value.default !== undefined && value.default != "" && <span className="text-gray-500"> (default: {JSON.stringify(value.default)})</span>} */}
                {value.enum && <span className="text-purple-600"> (enum: {value.enum.join(', ')})</span>}
                {value.pattern && <span className="text-orange-600"> (pattern: {value.pattern})</span>}
                {value.minimum !== undefined && <span className="text-green-600"> (min: {value.minimum})</span>}
                {value.maximum !== undefined && <span className="text-green-600"> (max: {value.maximum})</span>}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (schema.type === 'array') {
      if (!schema.items || (Array.isArray(schema.items) && schema.items.length === 0)) {
        return null;
      }
      const ref = getRef(schema.items, parent, key);
      if (ref) {
        return ref;
      }
      const child = renderSchema(schema.items, parent, key || schema.title)
      if (child == null) {
        return null
      }
      return (
        <div className="border pl-2 rounded-lg ">
          {schema.title && schema.title != key && <h4 className="font-bold">{schema.title}</h4>}
          {schema.description && <p className="text-sm text-gray-600 mb-2 description">{description(schema.description)}</p>}
          <div className="pl-5">
            {schema.minItems && <div className="text-sm text-gray-600">Min items: {schema.minItems}</div>}
            {schema.maxItems && <div className="text-sm text-gray-600">Max items: {schema.maxItems}</div>}
            {child}
          </div>
        </div>
      );
    } else {
      return (
        <span>
          <span className="text-blue-500">
            {schema.type} {schema.format ? `(${schema.format})` : ''}
          </span>
          {schema.enum && <span className="text-purple-600"> (enum: {schema.enum.join(', ')})</span>}
          {schema.pattern && <span className="text-orange-600"> (pattern: {schema.pattern})</span>}
          {schema.minimum !== undefined && <span className="text-green-600"> (min: {schema.minimum})</span>}
          {schema.maximum !== undefined && <span className="text-green-600"> (max: {schema.maximum})</span>}
          {schema.default !== undefined && schema.default != "" && <span className="text-gray-500"> (default: {JSON.stringify(schema.default)})</span>}
        </span>
      );
    }
  };

  return <Details summary="values.yaml">
    <div >{renderSchema(schema)}</div>
  </Details>
};

export default OpenAPISchema;
