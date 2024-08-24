import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ContactForms from './ContactForms';
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5';

const EnquiriesAndForms = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('enquiryForm');
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    contactDetails: '',
    enquiryDate: '',
    notes: '',
  });
  const [enquiries, setEnquiries] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (activeTab === 'enquiryList') {
      fetchEnquiries();
    }
  }, [activeTab, sortOption, statusFilter, currentPage]);

const fetchEnquiries = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await axios.get('/api/admin/enquiries', {
      headers: { Authorization: `Bearer ${admin.token}` },
      params: { sort: sortOption, status: statusFilter, page: currentPage },
    });
    if (Array.isArray(response.data.data)) {
      setEnquiries(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage);
    } else {
      throw new Error('Invalid data structure received from API');
    }
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    setError(error.message || 'Failed to fetch enquiries');
    toast.error('Failed to fetch enquiries');
    setEnquiries([]);
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (e) => {
    setEnquiryData({ ...enquiryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/enquiries', enquiryData, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      toast.success('Enquiry submitted successfully');
      setEnquiryData({ name: '', contactDetails: '', enquiryDate: '', notes: '' });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error('Failed to submit enquiry');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/admin/enquiries/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      toast.error('Failed to update enquiry status');
    }
  };

  const handlePageForward = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageBackward = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
   <div className="container mx-auto p-4 bg-gray-900 text-white">
    <div className="flex flex-col mb-4 sm:flex-row sm:justify-center">
      <button
        className={`mb-2 sm:mb-0 sm:mr-2 px-4 py-2 ${
          activeTab === 'enquiryForm'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-300'
        } rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-500`}
        onClick={() => setActiveTab('enquiryForm')}
      >
        Enquiry Form
      </button>
      <button
        className={`mb-2 sm:mb-0 sm:mr-2 px-4 py-2 ${
          activeTab === 'enquiryList'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-300'
        } rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-500`}
        onClick={() => setActiveTab('enquiryList')}
      >
        Enquiry List
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === 'contactForms'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-300'
        } rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-500`}
        onClick={() => setActiveTab('contactForms')}
      >
        Contact Forms
      </button>
    </div>

     
    {activeTab === 'enquiryForm' && (
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                id="name"
                type="text"
                name="name"
                value={enquiryData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="contactDetails">
                Contact Details
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                id="contactDetails"
                type="text"
                name="contactDetails"
                value={enquiryData.contactDetails}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="enquiryDate">
                Enquiry Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                id="enquiryDate"
                type="date"
                name="enquiryDate"
                value={enquiryData.enquiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
                id="notes"
                name="notes"
                value={enquiryData.notes}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'enquiryList' && (
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <select
            className="mb-2 sm:mb-0 sm:mr-2 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
         <div className="overflow-x-auto">
      {isLoading ? (
        <p className="text-center text-white">Loading enquiries...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : enquiries.length > 0 ? (
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Contact Details</th>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Enquiry Date</th>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Notes</th>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Status</th>
              <th className="py-2 px-4 border-b border-gray-800 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td className="py-2 px-4 border-b border-gray-800">{enquiry.name}</td>
                <td className="py-2 px-4 border-b border-gray-800">{enquiry.contactDetails}</td>
                <td className="py-2 px-4 border-b border-gray-800">
                  {new Date(enquiry.enquiryDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-800">{enquiry.notes}</td>
                <td className="py-2 px-4 border-b border-gray-800">
                  <span className={`px-2 py-1 rounded ${
                    enquiry.status === 'open' ? 'bg-yellow-600' : 'bg-green-600'
                  }`}>
                    {enquiry.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-gray-800">
                  <button
                    className={`px-2 py-1 ${
                      enquiry.status === 'open' ? 'bg-green-600' : 'bg-yellow-600'
                    } text-white rounded transition-all duration-300 ease-in-out hover:opacity-80`}
                    onClick={() => handleStatusChange(enquiry._id, enquiry.status === 'open' ? 'resolved' : 'open')}
                  >
                    {enquiry.status === 'open' ? 'Mark Resolved' : 'Reopen'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-white">No enquiries found.</p>
      )}
          </div>
      <div className="flex justify-center mt-4">
      <button
        className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 mr-2"
        onClick={handlePageBackward}
        disabled={currentPage === 1}
      >
        <IoChevronBackCircleSharp />
      </button>
      <span className="text-white uppercase font-bold text-sm mx-2">
        {currentPage} / {totalPages}
      </span>
      <button
        className="px-2 py-1 text-white rounded-lg border text-xl border-gray-300 hover:border-gray-400 ml-2"
        onClick={handlePageForward}
        disabled={currentPage === totalPages}
      >
        <IoChevronForwardCircleSharp />
      </button>
    </div>
        </div>
      )}

      {activeTab === 'contactForms' && (
        <div>
          <ContactForms />
        </div>
      )}
    </div>
  );
};

export default EnquiriesAndForms;