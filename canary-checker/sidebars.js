module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'health-checks',
      label: 'Overview'
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started'
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        {
          type: 'autogenerated',
          dirName: "concepts"
        }]
    },
    {
      type: 'category',
      label: 'Checks',
      items: [
        {
          className: 'condensed',
          type: 'autogenerated',
          dirName: 'reference'
        }
      ]
    },

    {
      type: 'category',
      label: 'Examples',
      items: [

        {
          className: 'condensed',
          type: 'autogenerated',
          dirName: 'examples'
        }
      ]
    },

    {
      type: 'category',
      label: 'Reference',
      items: [

        {
          label: "CEL",
          type: 'doc',
          id: 'scripting/cel'
        },
        {
          label: "Go Templates",
          type: 'doc',
          id: 'scripting/gotemplate'
        },
        {
          label: "Javascript",
          type: 'doc',
          id: 'scripting/javascript'
        }

      ]
    },
    {
      type: 'category',
      label: 'Comparisons',
      items: [
        {
          type: 'doc',
          id: 'comparisons/blackbox-exporter',
          label: 'Blackbox Exporter'
        }
      ]
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting'
    },


    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'tutorials/control-plane-testing/index',
          label: 'Control Plane Testing'
        }
      ]

    },


  ]
}
