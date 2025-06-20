import { INodeProperties } from 'n8n-workflow'
import { aggregateNodeMethods } from '../helpers/methods'
import runHooks from './hooks'

import * as spreadsheet from './spreadsheet'
import * as sheetFilter from './sheet-filter'
import * as sheetFilterView from './sheet-filter-view'
import * as filterConditionFilterView from './filter-condition-filter-view'
import * as sheetRowColumn from './sheet-row-column'
import * as sheetData from './sheet-data'
import * as sheetFloatingImage from './sheet-floating-image'

const authenticationProperties: INodeProperties[] = [
  {
    displayName: 'Authentication',
    name: 'authentication',
    type: 'options',
    options: [
      {
        name: 'Tenant Token',
        value: 'larkSuiteTenantApi',
      },
      {
        name: 'OAuth2',
        value: 'larkSuiteOAuth2Api',
      },
    ],
    default: 'larkSuiteTenantApi',
  },
]

const resourceSelect: INodeProperties[] = [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Spreadsheet',
        value: 'Docs Sheets Spreadsheet',
      },
      {
        name: 'Sheet Filter',
        value: 'Docs Sheets Sheet Filter',
      },
      {
        name: 'Sheet Filter View',
        value: 'Docs Sheets Sheet Filter View',
      },
      {
        name: 'Filter Condition Filter View',
        value: 'Docs Sheets Filter Condition Filter View',
      },
      {
        name: 'Sheet Row Column',
        value: 'Docs Sheets Sheet Row Column',
      },
      {
        name: 'Sheet Data',
        value: 'Docs Sheets Sheet Data',
      },
      {
        name: 'Sheet Floating Image',
        value: 'Docs Sheets Sheet Floating Image',
      },
    ],
    default: 'Docs Sheets Spreadsheet',
  },
]

const extraProperties: INodeProperties[] = [
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add option',
    default: {},
    options: [
      {
        displayName: 'Use Custom Body',
        name: 'useCustomBody',
        type: 'boolean',
        description: 'Whether to use a custom body',
        default: false,
      },
    ],
  },
]

const rawProperties: INodeProperties[] = [
  ...authenticationProperties,
  ...resourceSelect,
  ...spreadsheet.properties,
  ...sheetFilter.properties,
  ...sheetFilterView.properties,
  ...filterConditionFilterView.properties,
  ...sheetRowColumn.properties,
  ...sheetData.properties,
  ...sheetFloatingImage.properties,
  ...extraProperties,
]

const { properties, methods: selfMethods } = runHooks(rawProperties)

const methods = aggregateNodeMethods([
  selfMethods,
  spreadsheet.methods,
  sheetFilter.methods,
  sheetFilterView.methods,
  filterConditionFilterView.methods,
  sheetRowColumn.methods,
  sheetData.methods,
  sheetFloatingImage.methods,
])

export { properties, methods }
