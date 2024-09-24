import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from 'react-bootstrap/Badge';
import { RxCross2 } from "react-icons/rx";


const containerStyle = {
    padding: "20px",
    display: "inline-block",
    width: "500px",
    border: "1px solid darkgrey",
    borderRadius: "10px",
    background: "#EAEAEA",
};

const inputStyle = {
    display: "inline-block",
    fontSize: "0.9em",
    margin: "5px",
    width: "90%",
    border: "0",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "1rem",
};

const tagStyle = {
    display: "inline-block",
    backgroundColor: "#6610f2",
    margin: "5px",
    padding: "4px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
};

const TagInput = () => {
    const [tags, setTags] = useState([]);
    

    useEffect(() => {
        const fetchTags = async () => {
            const response = await axios.get("http://localhost:5000/tags");
            setTags(response.data);
        };
        fetchTags();
    }, []);

    const handleAddTag = async (e) => {
        if (e.key !== "Enter") return;
        const input = e.target.value;

        if (!input) return;
        if (tags.some(tag => tag.name === input)) return;

        try {
            const response = await axios.post("http://localhost:5000/tags", { name: input });
            setTags([...tags, response.data]);
            e.target.value = "";
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

    const onDeleteTag = async (tagId) => {
        try {
            await axios.delete(`http://localhost:5000/tags/${tagId}`);
            setTags(tags.filter(tag => tag._id !== tagId));
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    return (
        <div style={containerStyle}>
            <h4>Add Skills</h4>
            <hr/>
            <p> <Badge bg="primary">Total Tags: {tags.length}</Badge></p>
           
   
            {tags.map((tag) => (
                <span key={tag._id} onClick={() => onDeleteTag(tag._id)} style={tagStyle}>
                   <span style={{color:"#fff"}}><RxCross2 /></span> {tag.name}
                </span>
            ))}
            <input
                style={inputStyle}
                onKeyUp={handleAddTag}
                type="text"
                placeholder="Enter value..."
            />
        </div>
    );
};

export default TagInput;
