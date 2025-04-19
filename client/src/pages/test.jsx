import SideNavbar from "./SideNavBar"; // Adjust the path if needed

const Test = () => {
  // Dummy user data for testing
  const data = {
    username: "John Doe"
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNavbar data={data} />

      {/* Main content */}
      <div className="ml-[18%] p-6 w-full">
        <h1 className="text-2xl font-bold">Hello, World!</h1>
      </div>
    </div>
  );
};

export default Test;
