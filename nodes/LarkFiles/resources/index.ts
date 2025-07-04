import { INodeProperties } from 'n8n-workflow'
import { aggregateNodeMethods } from '../helpers/methods'
import runHooks from './hooks'

import * as file from './file'
import * as multipartUploadFiles from './multipart-upload-files'
import * as permissionMember from './permission-member'
import * as permissionpublic from './permissionpublic'
import * as statistics from './statistics'
import * as media from './media'
import * as multipartUploadMedia from './multipart-upload-media'
import * as comment from './comment'
import * as subscription from './subscription'
import * as documentImport from './document-import'

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
        name: 'File',
        value: 'Docs File Management File',
      },
      {
        name: 'Multipart Upload File',
        value: 'Docs File Management File Multipart Upload Files',
      },
      {
        name: 'Permission Member',
        value: 'Docs File Management Permission Permission Member',
      },
      {
        name: 'Permissionpublic',
        value: 'Docs File Management Permission Permission Public',
      },
      {
        name: 'Statistic',
        value: 'Docs File Management Statistics',
      },
      {
        name: 'Media',
        value: 'Docs File Management Media',
      },
      {
        name: 'Multipart Upload Media',
        value: 'Docs File Management Media Multipart Upload Media',
      },
      {
        name: 'Comment',
        value: 'Docs File Management Comment',
      },
      {
        name: 'Subscription',
        value: 'Docs File Management Subscription',
      },
      {
        name: 'Document Import',
        value: 'Docs File Management Document Import',
      },
    ],
    default: 'Docs File Management File',
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
  ...file.properties,
  ...multipartUploadFiles.properties,
  ...permissionMember.properties,
  ...permissionpublic.properties,
  ...statistics.properties,
  ...media.properties,
  ...multipartUploadMedia.properties,
  ...comment.properties,
  ...subscription.properties,
  ...documentImport.properties,
  ...extraProperties,
]

const { properties, methods: selfMethods } = runHooks(rawProperties)

const methods = aggregateNodeMethods([
  selfMethods,
  file.methods,
  multipartUploadFiles.methods,
  permissionMember.methods,
  permissionpublic.methods,
  statistics.methods,
  media.methods,
  multipartUploadMedia.methods,
  comment.methods,
  subscription.methods,
  documentImport.methods,
])

export { properties, methods }
