const Admin = () => {
  return (
    <div className="flex flex-col items-center  gap-5 md:w-11/12 min-h-[calc(100vh-5rem)] mx-auto p-4">
      <div className="flex flex-row w-full gap-6">
        <aside className="md:w-3/12">
          <div>
            <div>
              <h2>Admin Panel</h2>
            </div>
            <div>
              <div>Orders</div>
              <div>Dashboard</div>
              <div>Inventory</div>
              <div>Users</div>
            </div>
          </div>
        </aside>
        <aside className="md:w-9/12">
          <div>
            <div>This is Dashboard</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Admin;
