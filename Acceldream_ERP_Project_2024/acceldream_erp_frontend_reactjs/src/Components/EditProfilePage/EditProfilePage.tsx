import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./EditProfilePage.css"; // Add custom CSS styles here
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../../Graphql/querys";
import { getAuthHeaders } from "../../Authenticates/isAuthenticated";

interface EditProfilePageProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({
    isOpen,
    onClose,
}) => {
    const { data, refetch } = useQuery(USER_QUERY, getAuthHeaders())
    const [formData, setFormData] = useState({
        userName: data?.userDetails.userName || "",
        firstName: data?.userDetails.firstName || "",
        lastName: data?.userDetails.lastName || "",
        email: data?.userDetails.email || "",
        mobile: data?.userDetails.mobile || "",
        description: data?.userDetails.description || "",
        image: data?.userDetails.image || "",
        imagePreview: "avatar.png"//user.imagePreview
    });
useEffect(()=>{
    setFormData({
        userName: data?.userDetails.userName || "",
        firstName: data?.userDetails.firstName || "",
        lastName: data?.userDetails.lastName || "",
        email: data?.userDetails.email || "",
        mobile: data?.userDetails.mobile || "",
        description: data?.userDetails.description || "",
        image: data?.userDetails.image || "",
        imagePreview: "avatar.png"//user.imagePreview
    })
},[data])
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: any) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("formData22=====>", formData)
        refetch()
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="edit-user-modal"
        //   overlayClassName="edit-user-overlay"
        >
            <div className="edit-user-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="avatar-container">
                        <label htmlFor="image">
                            <img
                                src="avatar.png"//{formData.imagePreview}
                                alt="avatar.png"
                                className="avatar-preview"
                            />
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />

                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                    <label>Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    <div className="form-buttons">
                        <button type="submit" className="save-button">Update Profile</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditProfilePage;
