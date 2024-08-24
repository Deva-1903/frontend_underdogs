import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function ManageTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
const [newMember, setNewMember] = useState({
  name: '',
  role: '',
  instaUrl: '',
  email: '',
  yearsOfExperience: '',
  specialization: '',
  certifications: '',
  bio: '',
  phoneNumber: '',
});
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/api/team-members', {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to fetch team members');
    }
  };

    const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
        setSelectedImage(files[0]);
    } else if (name === 'yearsOfExperience') {
        const numericValue = value.replace(/[^0-9]/g, '');
        setNewMember({ ...newMember, [name]: numericValue });
    } else {
        setNewMember({ ...newMember, [name]: value });
    }
    };
    const uploadImageToFirebase = async (file) => {
  const uuid = uuidv4();
  const storageRef = ref(storage, `team-members/${uuid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
    

    const handleEdit = (member) => {
    setEditingMember(member);
    setNewMember({ name: member.name, role: member.role, image: null, instaUrl: member.instaUrl, email: member.email, yearsOfExperience: member.yearsOfExperience });
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!selectedImage) {
    toast.error('Please select an image');
    return;
  }

  try {
    const imageUrl = await uploadImageToFirebase(selectedImage);
    
    const teamMemberData = {
      ...newMember,
      image: imageUrl,
      method: 'POST'
    };

    await axios.post('/api/admin/team-members', teamMemberData, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    toast.success('Team member added successfully');
    fetchTeamMembers();
    setNewMember({   name: '',
  role: '',
  instaUrl: '',
  email: '',
  yearsOfExperience: '',
  specialization: '',
  certifications: '',
  bio: '',
  phoneNumber: '' });
    setSelectedImage(null);
  } catch (error) {
    console.error('Error adding team member:', error);
    toast.error('Failed to add team member');
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  
  try {
    let imageUrl = editingMember.image;
    
    if (selectedImage) {
      imageUrl = await uploadImageToFirebase(selectedImage);
    }
    
    const teamMemberData = {
      ...newMember,
      image: imageUrl,
      method: 'PUT',
      id: editingMember._id
    };

    await axios.post('/api/admin/team-members', teamMemberData, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    toast.success('Team member updated successfully');
    fetchTeamMembers();
    setEditingMember(null);
    setNewMember({ name: '', role: '', instaUrl: '', email: '', yearsOfExperience: '' });
    setSelectedImage(null);
  } catch (error) {
    console.error('Error updating team member:', error);
    toast.error('Failed to update team member');
  }
};

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this team member?')) {
    try {
      await axios.post('/api/admin/team-members', 
        { method: 'DELETE', id },
        {
          headers: { Authorization: `Bearer ${admin.token}` },
        }
      );
      toast.success('Team member deleted successfully');
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
    }
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
<h2 className="text-2xl font-bold mb-4 text-white text-center mx-auto">Manage Team Members</h2>      <form onSubmit={editingMember ? handleUpdate : handleSubmit} className="mb-8 max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="role"
            value={newMember.role}
            onChange={handleInputChange}
            placeholder="Role"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="instaUrl"
            value={newMember.instaUrl}
            onChange={handleInputChange}
            placeholder="Instagram URL"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
  <input
    type="text"
    name="specialization"
    value={newMember.specialization}
    onChange={handleInputChange}
    placeholder="Specialization"
    className="w-full p-2 rounded bg-gray-700 text-white"
  />
</div>
<div className="mb-4">
  <input
    type="text"
    name="certifications"
    value={newMember.certifications}
    onChange={handleInputChange}
    placeholder="Certifications (comma-separated)"
    className="w-full p-2 rounded bg-gray-700 text-white"
  />
</div>
<div className="mb-4">
  <input
    type="tel"
    name="phoneNumber"
    value={newMember.phoneNumber}
    onChange={handleInputChange}
    placeholder="Phone Number"
    className="w-full p-2 rounded bg-gray-700 text-white"
  />
</div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={newMember.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="yearsOfExperience"
            value={newMember.yearsOfExperience}
            onChange={handleInputChange}
            placeholder="Years of Experience"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
<div className="mb-4">
  <input
    type="file"
    name="image"
    onChange={handleInputChange}
    className="w-full p-2 rounded bg-gray-700 text-white"
    accept="image/*"
  />
  {selectedImage && (
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Selected"
      className="mt-2 w-full h-48 object-cover rounded"
    />
  )}
</div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingMember ? 'Update Member' : 'Add Member'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div key={member._id} className="bg-gray-800 p-4 rounded">
            <img src={member.image} alt={member.name} className="w-full h-48 object-cover mb-2 rounded" />
            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
            <p className="text-gray-300">{member.role}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(member)}
                className="mr-2 text-blue-500 hover:text-blue-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTeam;