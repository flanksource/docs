import json
from jinja2 import Template
from box import Box
import sys
import glob
import os.path
docSite="mission-control"
indexData = glob.glob(f"{docSite}/.docusaurus/docusaurus-plugin-content-docs/default/p/index-*.json")
debugDataFile =  glob.glob(f"{docSite}/.docusaurus/docusaurus-plugin-debug/default/p/docusaurus-debug-content-*.json")
print(f"Using {indexData} and {debugDataFile}")


with open(indexData[0], 'r') as f:
    data = json.load(f)

data = Box(data)



with open(debugDataFile[0], 'r') as f:
    debugData = Box(json.load(f))

allDocs = debugData.allContent["docusaurus-plugin-content-docs"].default.loadedVersions[0].docs

print (f"{len(allDocs)}")
for indexName, items in data.version.docsSidebars.items():

  indexPage = f"{docSite}/docs/{items[0].href}/index.mdx"
  print(f"Generating {indexPage}")

  # Template for markdown generation
  markdown_template = """

import {Card, Cards} from '@site/src/components/Card'

  <Cards>

  {% for subitem in items -%}
    {%- if subitem.href != indexName and not subitem.href in drafts %}
    <Card link="{{ subitem.href }}" title="{{ subitem.label }}"{{ ' '}}
    {%- if subitem.customProps -%}
    icon="{{ subitem.customProps.icon}}"
    {%- endif -%}  />
    {%- endif -%}
  {% endfor %}

  </Cards>
  """


  from pprint import pprint


  docs = list(filter(lambda x: x.slug.startswith(f"/{indexName}") and  x.get('frontMatter', {}).get('draft') , allDocs ))

  drafts = {i.slug: True for i in docs}

  template = Template(markdown_template)
  markdown_content = template.render(
    items=items,
    drafts=drafts,
     indexName=f"/{indexName}")


  if os.path.isfile(indexPage):
    print(indexPage)
    with open(indexPage, 'r') as f:
      mdx = f.read()
      mdx = mdx[0:mdx.rindex("---") + 3]

      with open(indexPage, 'w') as w:
        w.write(mdx)
        w.write(markdown_content)
