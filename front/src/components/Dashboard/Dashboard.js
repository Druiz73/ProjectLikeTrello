import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import './Dashboard.css'
//Context
import NoteContext from '../../context/notes/noteContext';
import ProjectsContext from '../../context/projects/projectsContext';
import organizationContext from '../../context/organizations/organizationContext';
import notesCompanyContext from '../../context/notesCompany/notesCompanyContext';
//Components
import { Row, Col, Container, Button, Dropdown, DropdownButton, Carousel } from "react-bootstrap";
import Canva from '../Canva/Canva';
import Note from '../Note/Note';
import MeetingsReminder from "../MeetingsReminder/MeetingsReminder";
import AlertMsg from '../AlertMsg/AlertMsg'
import ToastNotif from '../ToastNotif/ToastNotif';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import Searchbar from '../Searchbar/Searchbar';
import ButtonNotes from '../ButtonNotes/ButtonNotes';
import GetOrganizations from '../GetOrganizations/GetOrganizations';

const Dashboard = ({ match }) => {
  //Context
  const noteContext = useContext(NoteContext);
  const { notes, getNotes, addNote, loading, noteMsg, deleteSuccess } = noteContext;
  const projectsContext = useContext(ProjectsContext);
  const OrganizationContext = useContext(organizationContext);
  const { getActualOrganization } = OrganizationContext;
  const NotesCompanyContext = useContext(notesCompanyContext);
  const { createCompanyNotes, getCompanyNotes, notesCompany } = NotesCompanyContext;
  //State
  const { t } = useTranslation();
  const [background, setBackground] = useState(localStorage.getItem("background"));
  const { GetProjectList } = projectsContext;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [noteList, setNoteList] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const filterByStatus = filterStatus !== 'all' ? notes.filter(notes => notes.status === filterStatus) : notes;

  useEffect(() => {
    GetProjectList(match.params.id);
    getNotes();
    if (loading) {
      getNotes();
    }
    getActualOrganization(match.params.id);
    getCompanyNotes(match.params.id);
  }, [loading, match.params.id]);

  useEffect(() => {
    setNoteList(notes);
  }, [notes]);


  const handleByStatus = ({ value }) => {
    if (value !== filterStatus) {
      setFilterStatus(value);
      setSearchTerm('');
      if (value === 'all') {
        setFilteredNotes(notes);
      } else {
        const filterList = notes.filter(note => note.status === value);
        setFilteredNotes(filterList);
      }
    }
  }

  const handleSearchbar = e => {
    setSearchTerm(e.target.value);
    if (searchTerm.length > 3) {
      const results = filteredNotes.length === 0 ?
        noteList.filter(note => note.description.toLowerCase().includes(searchTerm.toLowerCase()) || note.title.toLowerCase().includes(searchTerm.toLowerCase())) :
        filteredNotes.filter(note => note.description.toLowerCase().includes(searchTerm.toLowerCase()) || note.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredNotes(results);
      if (results.length === 0) {
        setFilteredNotes(filterByStatus);
      }
    } else {
      setFilteredNotes(filterByStatus);
    }
    if (!searchTerm) {
      setFilteredNotes(filterByStatus);
    }
  }

  const handleSelect = (e) => {
    localStorage.setItem("background", e);
    setBackground(e);
  }

  const handleCarousel = (index, e) => {
    setCarouselIndex(index);
  }

  return (
    <>

      <Row className="d-flex justify-content-center m-0">
        <MeetingsReminder />
      </Row>
      <Container fluid>
        <Row className="d-flex mx-auto">
          <Col xs={12} sm={12} md={12} lg={3} classname="mt-5 w-50 " >
            <h4 className="mx-auto" >Organizaciones</h4>
            <ul className="my-auto">
              <GetOrganizations />
            </ul>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <Row>
              {
                carouselIndex === 0
                  ? <h1>Mis notas</h1>
                  : <h1>Organización</h1>
              }
            </Row>
            {
              noteMsg &&
              <AlertMsg text={noteMsg} variant="danger" />
            }
            {
              deleteSuccess &&
              <ToastNotif text={deleteSuccess} />
            }
            <Row className="my-4 align-items-center">
              <Col sm={12}>
                <Row>
                  <Col xs={2} sm={2} md={2} lg={2}>
                    <ButtonNotes
                      isCompany={carouselIndex !== 0 ? true : false}
                      id={t("AddNewNote")}
                      loading={loading}
                      addNote={carouselIndex === 0 ? addNote : createCompanyNotes}
                      filter={setFilterStatus}
                    />
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <FilterDropdown
                      options={['All', 'Completed', 'Active']}
                      handleOnChange={handleByStatus}
                    />
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <Searchbar
                      searchTerm={searchTerm}
                      handleChange={e => handleSearchbar(e)}
                    />
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} className="d-flex justify-content-end">
                    <DropdownButton
                      title={t("BackgroundTittle")}
                      id="dropdown-basic"
                      variant="info"
                      onSelect={handleSelect}>
                      <Dropdown.Item eventKey="cork"><img className="fondo-color-cork" />{t("BackgroundLabelCork")}</Dropdown.Item>
                      <Dropdown.Item eventKey="dark"><img className="fondo-color-dark" />{t("BackgroundLabelDark")}</Dropdown.Item>
                      <Dropdown.Item eventKey="wood"><img className="fondo-color-wood" />{t("BackgroundLabelWood")}</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Carousel
                  interval={null}
                  activeIndex={carouselIndex}
                  onSelect={handleCarousel}
                  indicators={false}
                  nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
                  prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
                >
                  <Carousel.Item>
                    <Canva background={background}>
                      {
                        filterStatus === 'all' && filteredNotes.length === 0 ?
                          filterByStatus.map((note, index) => {
                            return (
                              <Note
                                key={index}
                                noteList={noteList}
                                handleList={setNoteList}
                                note={note}
                              />
                            )
                          }) :
                          filteredNotes.map((note, index) => {
                            return (
                              <Note
                                key={index}
                                noteList={filteredNotes}
                                handleList={setFilteredNotes}
                                note={note}
                              />
                            )
                          })
                      }
                    </Canva>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Canva background={background}>
                      {
                        notesCompany.map((note, index) => {
                          return (
                            <Note
                              isCompany
                              key={index}
                              noteList={notesCompany}
                              handleList={setFilteredNotes}
                              note={note}
                            />
                          )
                        })
                      }
                    </Canva>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;