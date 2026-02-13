import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios";
import { IoChevronForwardCircleSharp, IoChevronBackCircleSharp } from "react-icons/io5";
import { FaReplyAll } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const ContactForms = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [contactForms, setContactForms] = useState([]);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));
    if (!storedAdmin) {
      navigate("/login");
    } else {
      setAdmin(storedAdmin);
      fetchContactForms(storedAdmin.token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, currentPage]);

  const fetchContactForms = async (token) => {
    setIsFetching(true);
    try {
      const response = await axios.get('/api/admin/contact-forms', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
      });
      setContactForms(response.data.data);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
      toast.error('Failed to fetch contact forms');
    } finally {
      setIsFetching(false);
    }
  };

  const handlePageForward = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePageBackward = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleDelete = async (id) => {
    if (admin?.username === "karthik" || admin?.username === "bala") {
      try {
        const response = await axios.delete(`/api/admin/contact-form/${id}`, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        });

        if (response.status === 200) {
          toast.success("Contact form deleted successfully");
          fetchContactForms(admin.token);
        } else {
          console.error("Error deleting contact form:", response);
          toast.error("Error deleting contact form");
        }
      } catch (error) {
        console.error("Error deleting contact form:", error);
        toast.error("Error deleting contact form");
      }
    } else {
      toast.error("You don't have access");
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center">
      <h1 className="text-white text-center text-3xl font-bold py-6">
        Contact Forms
      </h1>
      <div className="flex justify-center pb-8 w-full">
        <div className="overflow-x-auto p-4">
          <div className="inline-block min-w-full justify-center max-h-screen overflow-hidden">
            {isFetching ? (
              <div className="flex justify-center items-center h-16">
                <p className="text-white text-lg font-bold">Loading...</p>
              </div>
            ) : contactForms.length > 0 ? (
              <table className="min-w-full bg-gray-900 text-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-800 text-left">Name</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left">Email</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left">Message</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left">Reply</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {contactForms.map((form) => (
                    <tr key={form._id}>
                      <td className="py-2 px-4 border-b border-gray-800">{form.fullName}</td>
                      <td className="py-2 px-4 border-b border-gray-800">{form.email}</td>
                      <td className="py-2 px-4 border-b border-gray-800">
                        <div className="max-h-48 overflow-y-auto">
                          <p className="whitespace-pre-wrap">{form.message}</p>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-800">
                        <a
                          href={`mailto:${form.email}`}
                          className="text-green-500 hover:text-green-400"
                        >
                          <FaReplyAll className="text-2xl" />
                        </a>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-800">
                        <button
                          onClick={() => handleDelete(form._id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <RiDeleteBin2Fill className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white text-center">No contact forms found.</p>
            )}
          </div>
        </div>
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
  );
};

export default ContactForms;