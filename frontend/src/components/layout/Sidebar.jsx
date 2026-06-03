const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-4"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="fw-bold mb-5">
        Lead CRM
      </h3>

      <ul className="list-unstyled">

        <li className="mb-4">
          Dashboard
        </li>

        <li className="mb-4">
          Leads
        </li>

        <li className="mb-4">
          Add Lead
        </li>

        <li className="mb-4">
          Analytics
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;