import React, { Component, useState } from 'react';
import AsyncSelect from 'react-select/async'
import clientAxios from '../../config/clientAxios';

export default function GetUsers(props) {

    const [selectedOption, setSelectedOption] = useState({});

    const fetchData = (inputValue, callback) => {
        if (!inputValue || inputValue.length < 3) {
            callback([]);
        } else {
            setTimeout(async () => {
                let token = localStorage.getItem('token');
                const tempArray = [];
                try {
                    const { data } = await clientAxios.get(`/users/${inputValue}`);
                    
                    data.forEach((element) => {
                        tempArray.push({ label: `${element.email}`, value: element._id });
                    });

                    callback(tempArray);
                } catch (e) {
                    console.log(e, "catch the hoop");
                }
            });
        }
    }

    const onSearchChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
            props.setMembers(selectedOption);
        }
    };

    return (<div>
        <AsyncSelect
            isMulti
            loadOptions={fetchData}
            onChange={(e) => {
                onSearchChange(e);
            }}
            cacheOptions
        />
    </div>);
}
