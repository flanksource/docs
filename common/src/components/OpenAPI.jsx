

import Details from "@theme/Details";
const resolveRef = (schema, ref) => {
  const path = ref.replace(/^#\//, '').split('/');
  return path.reduce((acc, part) => acc && acc[part], schema);
};

const OpenAPISchema =  ({ schema, rootSchema }) => {
  if (!schema) {
    return <div className="text-red-500">No schema provided</div>;
  }

  const renderSchema = (schema, parent, key) => {
    if (!schema) {
      return "cannot find schema"
    }
    if (schema.$ref) {
      // Resolve reference
      const resolvedSchema = resolveRef(rootSchema, schema.$ref);
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
      if (typeof(parent.required) == 'function') {
        schema.properties[item].required = parent.required.includes(item)
      }
    }

    if (schema.type === 'object') {
      return (
        <div className="border pl-2 rounded-lg ">

          {/* {schema.title && <h4 className="font-bold">{schema.title}</h4>} */}
          {schema.description && !schema.description.includes("yaml-language-server:") && <p className="text-sm text-gray-600 mb-2">{schema.description}</p>}
          <ul className="list-disc pl-5">
            {Object.entries(schema.properties || {}).map(([key, value]) => (
              <li key={key} className="mb-1">
                <span className="font-semibold">
                  {key}
                  {value.type === 'array' && "[]"}
                  {/* {parent && parent.required !== null  && parent.required.includes(key) && <span className="text-red-500">*</span>} */}
                  {/* {value.required  && <span className="text-red-500">*</span>} */}
                </span>
                : {renderSchema(value, schema, key)}
                {value.description && <span className="text-gray-600"> - {value.description}</span>}
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
      return (
        <div className="border pl-2 rounded-lg ">
          {schema.title && schema.title !=  key && <h4 className="font-bold">{schema.title}</h4>}
          {schema.description && <p className="text-sm text-gray-600 mb-2">{schema.description}</p>}
          <div className="pl-5">
            {schema.minItems && <div className="text-sm text-gray-600">Min items: {schema.minItems}</div>}
            {schema.maxItems && <div className="text-sm text-gray-600">Max items: {schema.maxItems}</div>}
            {renderSchema(schema.items, parent,  key)}
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

  return     <Details summary="values.yaml">
  <div >{renderSchema(schema)}</div>
  </Details>
};

export default OpenAPISchema;
