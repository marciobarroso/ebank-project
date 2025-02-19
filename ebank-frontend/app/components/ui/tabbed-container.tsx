import { PageContainer } from '@/app/components/ui/page-container'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/components/ui/tabs'

import { TabbedContainerProps } from '@/app/types/tabbed-container.types'

export function TabbedContainer({
  title,
  description,
  tabs,
  defaultTab
}: TabbedContainerProps) {
  return (
    <PageContainer title={title} description={description}>
      <Tabs defaultValue={defaultTab}>
        <TabsList className='grid w-full grid-cols-2'>
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </PageContainer>
  )
}
