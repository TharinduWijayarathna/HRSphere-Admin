import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import { IconCheck, IconChevronLeft, IconChevronRight, IconPlus, IconTrash } from "@tabler/icons-react";
import TenantRoutes from "../../routes/TenantRoutes";
import axios from "axios";
import _ from 'lodash';
import "./index.css";
import PageHeader from "../../components/PageHeader";
import Select, { SingleValue } from 'react-select';
import SignatureCanvas from 'react-signature-canvas';

interface CountryOption {
  value: string;
  label: string;
}

const countries: CountryOption[] = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Japan', label: 'Japan' },
  { value: 'China', label: 'China' },
  { value: 'India', label: 'India' }
];

const TenantIndex: React.FC = () => {

  const [tenants, setTenants] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const sigCanvas = useRef<SignatureCanvas>(null);

  const [selectedCountry, setSelectedCountry] = useState<SingleValue<CountryOption>>(null);

  const handleCountryChange = (option: SingleValue<CountryOption>) => {
    setSelectedCountry(option);
  };


  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      console.log(dataURL); // Save or send this dataURL to the server
    }
  };

  const api = axios.create();

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

  const AddTenants = async (e: any) => {
    e.preventDefault();
    const form = document.getElementById('tenant-form') as HTMLFormElement;
    const data = new FormData(form);

    try {
      await TenantRoutes(api).store(data);
      getTenants(1, 10, '');
      form.reset();

      const close = document.getElementById('close-modal') as HTMLButtonElement;
      close.click();

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
    <>
      <AppLayout>

        <PageHeader pretitle="Tenant Management" title="Tenants">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#tenant-modal"

          >
            <IconPlus size={18} strokeWidth={2} className="me-2" />
            Add Tenants
          </button>
        </PageHeader>

        <div className="page-body">
          <div className="card">
            <div className="card-body border-bottom py-3">
              <div className="d-flex">
                <div className="text-secondary">
                  <div className="d-inline-block">
                    <input
                      placeholder="Search Tenants"
                      type="text"
                      className="form-control form-control-md"
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
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant: any, index: number) => (
                    <tr key={tenant.id}>
                      <td>{tenant.name}</td>
                      <td>{tenant.domain}</td>
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
        </div>
      </AppLayout>

      <div className="modal modal-blur fade" id="tenant-modal" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-md modal-dialog-centered" role="document">
          <div className="modal-content">
            <form id="tenant-form" onSubmit={AddTenants}>
              <div className="modal-header">
                <h5 className="modal-title">Add Tenant</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
              </div>
              <div className="modal-body text-start">
                <div className="mb-3">
                  <label className="form-label">Tenant Name</label>
                  <input type="text" className="form-control" name="name" placeholder="Enter tenant name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Domain Name</label>
                  <input type="text" className="form-control" name="domain" placeholder="Enter domain name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" placeholder="Enter address" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countries}
                    placeholder="Select a country"
                    isSearchable
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Signature</label>
                  <div style={{ border: '1px solid #000', borderRadius: '4px' }}>
                    <SignatureCanvas
                      ref={sigCanvas}
                      penColor="black"
                      canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                    />
                  </div>
                  <button type="button" className="btn btn-danger mt-2" onClick={clearSignature}>
                    <IconTrash size={18} strokeWidth={2} />
                  </button>
                  <button type="button" className="btn btn-primary mt-2 ms-1" onClick={saveSignature}>
                    <IconCheck size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default TenantIndex;