interface PageHeaderProps {
  title?: string
  show?: boolean
}

/**
 * @TODO: Add Breadcrumbs
 */
export const PageHeader = ({ title, show }: PageHeaderProps) => {
  return show ? (
    <div className="mb-4 flex items-center">
      <h3 className="mb-0 mr-3 font-semibold">{title}</h3>
    </div>
  ) : null
}

export default PageHeader
