type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className="container mx-auto py-8 px-4">{children}</div>;
};

export default PageLayout;
