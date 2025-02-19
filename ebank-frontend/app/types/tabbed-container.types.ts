export interface TabbedContainerProps {
  title: string
  description?: string
  defaultTab?: string
  tabs: Tab[]
}

export interface Tab {
  label: string
  value: string
  content: React.ReactNode
}
