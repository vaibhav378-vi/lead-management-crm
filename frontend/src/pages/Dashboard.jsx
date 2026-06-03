import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  FiMenu,
  FiBell,
  FiSearch,
  FiHome,
  FiUserPlus,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiUpload,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import "./dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "https://lead-management-crm-kvf0.onrender.com";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API_URL);
      setLeads(res.data.data || []);
    } catch (error) {
      console.log("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("crmUser");
    window.location.href = "/login";
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "New",
      notes: "",
    });
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      setShowModal(false);
      resetForm();
      fetchLeads();
    } catch (error) {
      console.log("Error saving lead:", error);
    }
  };

  const handleEdit = (lead) => {
    setEditId(lead._id);
    setForm({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      company: lead.company || "",
      status: lead.status || "New",
      notes: lead.notes || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchLeads();
    } catch (error) {
      console.log("Error deleting lead:", error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const text = `${lead.name || ""} ${lead.email || ""} ${lead.company || ""}`;
    const matchesSearch = text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || lead.status === filter;
    return matchesSearch && matchesFilter;
  });

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const lost = leads.filter((l) => l.status === "Lost").length;

  const chartData = {
    labels: ["New", "Contacted", "Qualified", "Converted", "Lost"],
    datasets: [
      {
        data: [newLeads, contacted, qualified, converted, lost],
        backgroundColor: [
          "#3b82f6",
          "#fbbf24",
          "#8b5cf6",
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 0,
        cutout: "68%",
      },
    ],
  };

  const statusClass = (status) => status?.toLowerCase() || "new";

  return (
    <div className={`crm-page ${darkMode ? "dark" : ""}`}>
      <aside className="crm-sidebar">
        <div>
          <div className="logo">
            <FiUsers />
            <span>LeadCRM</span>
          </div>

          <div className="menu">
            <button className="active">
              <FiHome /> Dashboard
            </button>

            <button onClick={openAddModal}>
              <FiUserPlus /> Add Lead
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("leads-table")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiUsers /> Leads
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("analytics")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiUsers /> Reports
            </button>

            

            <button onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <div className="user-card">
          <div className="avatar">V</div>
          <div>
            <h4>Vaibhav Bansal</h4>
            <p>Admin</p>
          </div>
        </div>
      </aside>

      <main className="crm-main">
        <header className="top-nav">
          <button className="hamburger">
            <FiMenu />
          </button>

          <div className="top-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search leads by name, email or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <div
  className="bell"
  onClick={() =>
    alert(
      `Notifications\n\n` +
      `• ${newLeads} New Leads\n` +
      `• ${converted} Converted Leads\n` +
      `• ${lost} Lost Leads`
    )
  }
>
            <FiBell />
            <span>3</span>
          </div>

          <div className="profile-img">V</div>
        </header>

        <section className="hero">
          <h1>Dashboard</h1>
          <p>Welcome back, Vaibhav! Here's what's happening with your leads.</p>
        </section>

        <section className="stats-row">
          <div className="stat-box">
            <div className="stat-icon blue-light">
              <FiUsers />
            </div>
            <div>
              <p>Total Leads</p>
              <h2>{total}</h2>
              <span className="up">↑ 12% from last month</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon green-light">✓</div>
            <div>
              <p>Converted Leads</p>
              <h2>{converted}</h2>
              <span className="up">↑ 8% from last month</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon yellow-light">◷</div>
            <div>
              <p>New Leads</p>
              <h2>{newLeads}</h2>
              <span className="up">↑ 15% from last month</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon red-light">×</div>
            <div>
              <p>Lost Leads</p>
              <h2>{lost}</h2>
              <span className="down">↓ 4% from last month</span>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel recent" id="leads-table">
            <div className="panel-head">
              <h3>Recent Leads</h3>
              <div className="filters">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Converted</option>
                  <option>Lost</option>
                </select>
                <button onClick={() => setFilter("All")}>View All Leads</button>
              </div>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Added On</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="empty">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.slice(0, 8).map((lead) => (
                      <tr key={lead._id}>
                        <td>{lead.name}</td>
                        <td>{lead.email}</td>
                        <td>{lead.company}</td>
                        <td>
                          <span className={`status ${statusClass(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td>
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString()
                            : "Today"}
                        </td>
                        <td className="actions">
                          <button>
                            <FiEye />
                          </button>
                          <button onClick={() => handleEdit(lead)}>
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDelete(lead._id)}>
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <p>
                Showing 1 to {Math.min(filteredLeads.length, 8)} of{" "}
                {filteredLeads.length} leads
              </p>
              <div>
                <button className="active-page">1</button>
                <button>2</button>
                <button>3</button>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="panel chart-panel" id="analytics">
              <h3>Leads by Status</h3>

              <div className="chart-flex">
                <div className="donut">
                  <Doughnut data={chartData} />
                </div>

                <div className="legend-list">
                  {[
                    ["New", newLeads],
                    ["Contacted", contacted],
                    ["Qualified", qualified],
                    ["Converted", converted],
                    ["Lost", lost],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className={`dot ${label.toLowerCase()}`}></span>
                      <p>{label}</p>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel quick-actions">
              <h3>Quick Actions</h3>

              <button onClick={openAddModal}>
                <span className="qa purple">
                  <FiPlus />
                </span>
                <div>
                  <b>Add New Lead</b>
                  <p>Add a new lead to the system</p>
                </div>
                <FiPlus />
              </button>

              <button onClick={() => alert("Import feature coming soon")}>
                <span className="qa green">
                  <FiUpload />
                </span>
                <div>
                  <b>Import Leads</b>
                  <p>Import leads from CSV or Excel</p>
                </div>
                <FiUpload />
              </button>

              <button onClick={() => window.print()}>
                <span className="qa red">
                  <FiDownload />
                </span>
                <div>
                  <b>Download Report</b>
                  <p>Download leads report</p>
                </div>
                <FiDownload />
              </button>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="modal-bg">
            <div className="modal-box">
              <h3>{editId ? "Edit Lead" : "Add New Lead"}</h3>

              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Converted</option>
                  <option>Lost</option>
                </select>

                <textarea
                  placeholder="Notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />

                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>

                  <button type="submit">
                    {editId ? "Update Lead" : "Save Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;