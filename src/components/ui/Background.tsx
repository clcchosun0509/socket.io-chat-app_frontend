type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return <main className="h-screen flex items-center justify-center flex-col bg-sky-600">{children}</main>;
};
export default Layout;
