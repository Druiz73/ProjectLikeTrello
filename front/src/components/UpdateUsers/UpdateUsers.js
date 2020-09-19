import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import clientAxios from '../../config/clientAxios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

export default function GetUsers(props) {
  //Translation 
  const { t, i18n } = useTranslation();

  const currMembers = props.currentMembers.map((m) => {
    const member = {
      ...m,
      value: m._id,
      label: m.email
    }
    delete member._id
    delete member.email
    return member;
  })

  const [selectedOption, setSelectedOption] = useState({});
  const [enableButton, setEnableButton] = useState(false);

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
      setEnableButton(true)
      setSelectedOption(selectedOption);
      props.setMembers(selectedOption);
    }
  };

  return (<Container>

    <AsyncSelect
      defaultValue={currMembers}
      isMulti
      loadOptions={fetchData}
      onChange={(e) => {
        onSearchChange(e);
      }}
      cacheOptions
    />

    <Row className="mt-2">
      <Col>
        <Button block onClick={() => props.update()} disabled={!enableButton}>{t("Save")}</Button>
      </Col>
      <Col>
        <Button block variant='secondary' onClick={() => props.setEditMembers(false)}>{t("Back")}</Button>
      </Col>
    </Row>
  </Container>);
}
