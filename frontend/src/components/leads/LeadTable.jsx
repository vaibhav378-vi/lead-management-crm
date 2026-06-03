import { useEffect, useState } from "react";
import axios from "axios";

const LeadTable = () => {

  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/leads"
      );

      setLeads(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="card shadow-sm border-0">

      <div className="card-body">

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (
              <tr key={lead._id}>

                <td>{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.company}</td>

                <td>{lead.status}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeadTable;