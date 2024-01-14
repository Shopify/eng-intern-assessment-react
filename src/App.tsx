import React from 'react'
import { AppProvider } from '@shopify/polaris';
import StopWatch from './StopWatch'

export default function App () {
  return (
    <AppProvider i18n={ {
      Polaris: {
        ResourceList: {
          sortingLabel: 'Sort by',
          defaultItemSingular: 'item',
          defaultItemPlural: 'items',
          showing: 'Showing {itemsCount} {resource}',
          Item: {
            viewItem: 'View details for {itemName}',
          },
        },
        Common: {
          checkbox: 'checkbox',
        },
      },
    } }>
      <StopWatch />
    </AppProvider>
  )
}