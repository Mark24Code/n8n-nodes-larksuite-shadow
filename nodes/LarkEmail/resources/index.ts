import { INodeProperties } from 'n8n-workflow'
import { aggregateNodeMethods } from '../helpers/methods'
import runHooks from './hooks'

import * as mailGroup from './mail-group'
import * as mailGroupMember from './mail-group-member'
import * as mailGroupPermissionMember from './mail-group-permission-member'
import * as mailGroupAlias from './mail-group-alias'
import * as publicMailbox from './public-mailbox'
import * as publicMailboxMember from './public-mailbox-member'
import * as publicMailboxAlias from './public-mailbox-alias'

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
        name: 'Mail Group',
        value: 'Email Mail Group',
      },
      {
        name: 'Mail Group Member',
        value: 'Email Mail Group Member',
      },
      {
        name: 'Mail Group Permission Member',
        value: 'Email Mail Group Permission Member',
      },
      {
        name: 'Mail Group Alias',
        value: 'Email Mail Group Alias',
      },
      {
        name: 'Public Mailbox',
        value: 'Email Public Mailbox',
      },
      {
        name: 'Public Mailbox Member',
        value: 'Email Public Mailbox Member',
      },
      {
        name: 'Public Mailbox Alias',
        value: 'Email Public Mailbox Alias',
      },
    ],
    default: 'Email Mail Group',
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
  ...mailGroup.properties,
  ...mailGroupMember.properties,
  ...mailGroupPermissionMember.properties,
  ...mailGroupAlias.properties,
  ...publicMailbox.properties,
  ...publicMailboxMember.properties,
  ...publicMailboxAlias.properties,
  ...extraProperties,
]

const { properties, methods: selfMethods } = runHooks(rawProperties)

const methods = aggregateNodeMethods([
  selfMethods,
  mailGroup.methods,
  mailGroupMember.methods,
  mailGroupPermissionMember.methods,
  mailGroupAlias.methods,
  publicMailbox.methods,
  publicMailboxMember.methods,
  publicMailboxAlias.methods,
])

export { properties, methods }
