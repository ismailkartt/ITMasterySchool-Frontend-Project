import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal'
import {  FaEdit, FaTimes } from 'react-icons/fa'
import {   setCurrentRecord, setListRefreshToken, setOperation } from '../../../store/slices/misc-slice'
import { deleteStudentInfo, getStudentInfoByPageForTeacher } from '../../../api/student-info-service'


const StudentInfoList = () => {
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const {listRefreshToken} = useSelector(state => state.misc); 

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  })

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getStudentInfoByPageForTeacher(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  const handleEdit = (row) => { 
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
   }

  const onPage = (event) => {
    setlazyState(event);
  }

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteStudentInfo(id);
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("Student info was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecord = () => {
    dispatch(setOperation("new"));
  }

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);
  

  const getOperationButtons = (row) => {
    if(row.built_in){
      return null;
    }
    return (
      <div>
        <Button className='btn-link' onClick={() => handleDelete(row.id)}>
          <FaTimes/>
        </Button>
        <Button className='btn-link' onClick={() => handleEdit(row)}>
          <FaEdit/>
        </Button>
      </div>
    )
  }

  const getFullName = (row) => { 
    const {name,surname} = row.studentResponse;
    return `${name} ${surname}`
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            <span>Student Info List</span>
            <Button onClick={handleNewRecord}>New Info</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={list}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
            <Column body={getFullName} header="Name"></Column> 
            <Column field="lessonName" header="Lesson"></Column> 
            <Column field="absentee" header="Absentee"></Column>
            <Column field="midtermExam" header="Midterm"></Column>
            <Column field="finalExam" header="Final"></Column>
            <Column field="note" header="Score"></Column>
            <Column field="average" header="Average"></Column>
            <Column field="infoNote" header="Note"></Column>
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>  
          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default StudentInfoList