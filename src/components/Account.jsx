import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  doc,
  where,
  deleteDoc,
} from 'firebase/firestore';

const Account = () => {
  const { user, logout } = UserAuth();
  const [Cars, setCars] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    year: '',
    make: '',
    model: '',
    color: '',
    trim: '',
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };
  // Read car from Firebase
  useEffect(() => {
    const q = query(collection(db, 'cars'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let carsArr = [];
      querySnapshot.forEach((sub) => {
        carsArr.push({ ...sub.data(), id: sub.id });
      });
      setCars(carsArr);
    });
    return () => unsubscribe;
  }, []);

  // Create car in Firebase

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createCar = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'cars'), {
        year: createFormData.year,
        make: createFormData.make,
        model: createFormData.model,
        trim: createFormData.trim,
        color: createFormData.color,
      });
      setCreateFormData({
        year: '',
        make: '',
        model: '',
        trim: '',
        color: '',
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  // Update car from Firebase
  // Delete car from Firebase

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email:{user && user.email}</p>
      <button onClick={handleLogout} className='border px-6 py-2 my-4 '>
        Logout
      </button>
      <form
        onSubmit={createCar}
        className='m-4 flex-col justify-between'
      >
        <input
          value={createFormData.year}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='number'
          placeholder='Enter new car year'
          name='year'
        />
        <input
          value={createFormData.make}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter car make'
          name='make'
        />
        <input
          value={createFormData.model}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter new car model'
          name='model'
        />
        <input
          value={createFormData.trim}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter car trim'
          name='trim'
        />
        <input
          value={createFormData.color}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter new car color'
          name='color'
        />
        <button
          className='border p-4 ml-2 mt-2 bg-purple-500 text-slate-100'
          type='submit'
        >
          Add New car
        </button>
      </form>
    </div>
  );
};

export default Account;
