import { SchemaParser } from "./schema-parser";

test('string textfield', () => {
    const parser = new SchemaParser();
    parser.visit({
        type: 'object',
        properties: {
            stringProp: {
                type: 'string'
            },
            colorProp: {
                type: 'string',
                'x-display': 'color-picker'
            },
        }
    });
    const result = parser.config;

    expect(result).toMatchObject([
        {
            key: 'stringProp',
            type: 'textfield'
        },
        {
            key: 'colorProp',
            type: 'textfield'
        }
    ]);

});

test('sub schema panel', () => {
    const parser = new SchemaParser();
    parser.visit({
        type: 'object',
        properties: {
            objectProp: {
                type: 'object',
                title: 'title',
                properties: {
                    stringProp: {
                        type: 'string'
                    } 
                }
            }
        }
    });
    const result = parser.config;

    expect(result).toMatchObject([
        {
            key: 'objectProp',
            label: 'title',
            type: 'panel',
            components: [
                {
                    key: 'stringProp',
                    type: 'textfield'
                }
            ]
        }
    ]);

});

test('oneOf select', () => {
    const parser = new SchemaParser();
    parser.visit({
        type: 'object',
        properties: {
            stringOneOf: {
                type: 'string',
                oneOf: [
                    {
                      const: 'value1',
                      title: 'Value 1'
                    },
                    {
                      const: 'value2',
                      title: 'Value 2'
                    }
                ]
            }
        }
    });
    const result = parser.config;

    expect(result).toMatchObject([
        {
            key: 'stringOneOf',
            type: 'select',
            values: [
                {
                    value: 'value1',
                    label: 'Value 1'
                },
                {
                    value: 'value2',
                    label: 'Value 2'
                }
            ]
        }
    ]);

});