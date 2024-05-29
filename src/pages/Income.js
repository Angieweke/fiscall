import { useEffect, useRef, useState } from "react";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { FaTrashAlt } from "react-icons/fa";

function Income() {
  const db = getFirestore(app);
  const auth = getAuth()
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "income"));
      const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setIncomeData(data);
    };
    fetchData();
  }, [db, incomeData]);

  
 const handleDelete = (id)=>{
 deleteDoc(doc(db, 'income', id)).then(()=>{
  alert('deleted successfully')
 }).catch((error)=>{
  console.error(error);
 })
 }
  return (
    <div>
      <IncomeModal auth={auth} db={db} />
      <DarkExample data={incomeData} />
    </div>
  );

  function DarkExample({data}) {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>#</th>
          <th>Salary</th>
          <th>Expenses</th>
          <th>Revenues</th>
          <th>Sales</th>
          <th>Net Income</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.userSal}</td>
            <td>{item.userExpense}</td>
            <td>{item.userRev}</td>
            <td>{item.usersale}</td>
            <td>{item.userNetIncome}</td>
            <td><Button onClick={()=> handleDelete(item.id)} variant="danger"><FaTrashAlt/></Button></td>
          </tr>
        ))}
      </tbody>
        
            
        
      </Table>
    );
  }
}

export default Income;

function IncomeModal({ db, auth }) {
  const salaryRef = useRef();
  const expensesRef = useRef();
  const revenueRef = useRef();
  const salesRef = useRef();
  const netIncomeRef = useRef();

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((s) => !s);
  };
  function handleClose() {
    setShow((s) => !s);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const salary = salaryRef.current.value;
    const expenses = expensesRef.current.value;
    const revenue = revenueRef.current.value;
    const sales = salesRef.current.value;
    const netIncome = netIncomeRef.current.value;

    // Add income data to Firestore
    setDoc(doc(collection(db, "income")), {
      // Assuming user data is available elsewhere
      userID: auth.currentUser.uid,
      userSal: salary,
      userExpense: expenses,
      userRev: revenue,
      usersale: sales,
      userNetIncome: netIncome,
      timestamp: new Date().getTime(),
    })
      .then(() => {
        console.log("Income data added successfully");
        onsubmit(); // Call the onSubmit function passed from the parent component
        handleClose(); // Close the modal after submission
      })
      .catch((error) => {
        console.error("Error adding income data: ", error.message);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add income
      </Button>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Income
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Salary</Form.Label>
              <Form.Control type="Text" placeholder="Salary" ref={salaryRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Expenses</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Expenses"
                ref={expensesRef}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Revenues</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Revenues"
                ref={revenueRef}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Sales</Form.Label>
              <Form.Control type="Text" placeholder="Sales" ref={salesRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Net Income</Form.Label>
              <Form.Control
                type="Text"
                placeholder="Net income"
                ref={netIncomeRef}
              />
            </Form.Group>
          <Button type="submit">Submit</Button>
          </Form>

          <Button onClick={handleClose}>Close</Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

// useEffect communicates with anything outside react fetch data from APIs or from a certain database
//useRef used to select HTML elements mostly used when getting values of inputs
//useState updating the user interface of a website
//setDoc create a document object in your collection
//handleShow display modal
//handleClose close modal
