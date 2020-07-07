// uifwComponents

window.uifwComponents = (function () {
    return {
        Condition: {
            menuSection: 'Control',
            configurator: 'condition',
            displayName: 'Condition',
            icon: 'utility:question',
            helpText: 'A conditional statement'
        },
        Iteration: {
            menuSection: "Control",
            configurator: 'iteration',
            displayName: 'Iteration',
            icon: 'utility:loop',
            helpText: 'Iterate over an array of objects'
        },
        gridLayout: {
            menuSection: 'Layouts',
            configurator: "grid",
            displayName: "Grid",
            icon: 'utility:layout',
            helpText: 'A grid',
        },
        columnLayout: {
            menuSection: "Layouts",
            configurator: "none",
            displayName: "Column",
            icon: 'utility:arrowdown',
            helpText: 'A column',
        },
        rowLayout: {
            menuSection: "Layouts",
            configurator: "none",
            displayName: "Row",
            icon: 'utility:forward',
            helpText: 'A row',
        },
        Card: {
            menuSection: "Section Groups",
            configurator: "section",
            displayName: "Card",
            icon: "utility:textarea",
            helpText: "A card",
        },
        VerticalTab: {
            menuSection: "Section Groups",
            configurator: "none",
            displayName: "Vertical Tab",
            icon: "utility:toggle_panel_left",
            helpText: "A vertical tab",
        },
        VerticalNavigation: {
            menuSection: "Section Groups",
            configurator: "none",
            displayName: "Vertical Nav",
            icon: "utility:snippet",
            helpText: "A vertical nav",
        },
        pane: {
            menuSection: 'Layouts',
            configurator: "pane",
            displayName: 'Pane',
            icon: 'utility:tile_card_list',
            helpText: 'A pane',
        },
        tabContent: {
            menuSection: '_hidden',
            configurator: "section",
            displayName: "Section",
            icon: 'utility:builder',
        },
        currency: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Currency',
            icon: 'utility:currency',
            helpText: 'A currency output'
        },
        date: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Date',
            icon: 'utility:date_input',
            helpText: 'A date output'
        },
        datetime: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Date Time',
            icon: 'utility:date_time',
            helpText: 'A date-time output'
        },
        email: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Email',
            icon: 'utility:email',
            helpText: 'An email output'
        },
        number: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Number',
            icon: 'utility:number_input',
            helpText: 'A number output'
        },
        tel: {
            category: 'field',
            menuSection: "Field Types",
            configurator: "field",
            displayName: 'Phone',
            icon: 'utility:call',
            helpText: 'A phone output'
        },
        text: {
            category: 'field',
            menuSection: 'Field Types',
            configurator: "field",
            displayName: 'Text',
            icon: 'utility:textbox',
            helpText: 'A text output'
        },
        table: {
            category: 'table',
            menuSection: 'Field Types',
            configurator: "table",
            displayName: 'Table',
            icon: 'utility:table',
            helpText: 'A simple table'
        },
        section: {
            menuSection: 'Section Groups',
            configurator: 'section',
            displayName: 'Section',
            icon: 'utility:toggle_panel_top',
            helpText: 'A section',
        },
        collapse: {
            menuSection: 'Section Groups',
            configurator: 'none',
            displayName: 'Collapse',
            icon: 'utility:collapse_all',
            helpText: 'A show more/show less section',
        },
        title: {
            menuSection: 'Field Types',
            configurator: "title",
            displayName: 'Title/Heading',
            icon: 'utility:text_color',
            helpText: 'Title or Header'
        },
        combobox: {
            category: 'field',
            menuSection: 'Field Types',
            configurator: "field",
            displayName: 'Combobox',
            icon: 'utility:picklist',
            helpText: 'Combobox'
        },
    }
})();