import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import TenantRoutes from "../../routes/TenantRoutes";
import axios from "axios";
import _ from 'lodash';
import "./index.css";

const TenantIndex: React.FC = () => {

  const [tenants, setTenants] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const api = axios.create();

  const navigate = useNavigate();

  const getTenants = async (page: number, size: number, search: string) => {
    try {
      const response = await TenantRoutes(api).filter(page, size, search);
      setTenants(response.data.data);
      setPage(page);
      setSize(size);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedGetTenants = useCallback(
    _.debounce((page: number, size: number, search: string) => {
      getTenants(page, size, search);
    }, 300),
    [] 
  );

  useEffect(() => {
    debouncedGetTenants(page, size, search);
  }, [page, size, search, debouncedGetTenants]);

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(total / size)) return;
    getTenants(newPage, size, search);
  };

  useEffect(() => {
    getTenants(1, 10, '');
  }, []);

  return (
    <AppLayout>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Tenant Management</h3>
          <div className="ms-auto text-secondary">
            <button className="btn btn-primary" onClick={() => navigate("/tenants/new")}>
              <IconPlus size={18} strokeWidth={2} />
              &nbsp;Add tenants
            </button>
          </div>
        </div>
        <div className="card-body border-bottom py-3">
          <div className="d-flex">
            <div className="text-secondary">
              Search:
              <div className="ms-2 d-inline-block">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  aria-label="Search tenant"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th className="w-1">Tenant Name</th>
                <th>Domain Name</th>
                <th>Database Name</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant: any, index: number) => (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.domain}</td>
                  <td>{tenant.database}</td>
                  <td>{tenant.created_at}</td>
                  <td>{tenant.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex align-items-center">
          <p className="m-0 text-secondary">
            Showing {Math.min((page - 1) * size + 1, total)} to {Math.min(page * size, total)} of {total} entries
          </p>
          <ul className="pagination m-0 ms-auto">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(page - 1)} tabIndex={-1} aria-disabled={page === 1}>
                <IconChevronLeft size={24} strokeWidth={2} />
                prev
              </button>
            </li>
            {Array.from({ length: Math.ceil(total / size) }, (_, i) => (
              <li className={`page-item ${page === i + 1 ? "active" : ""}`} key={i}>
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === Math.ceil(total / size) ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(page + 1)} aria-disabled={page === Math.ceil(total / size)}>
                next
                <IconChevronRight size={24} strokeWidth={2} />
              </button>
            </li>
          </ul>
        </div>
      </div>

    </AppLayout>
  );
};

export default TenantIndex;