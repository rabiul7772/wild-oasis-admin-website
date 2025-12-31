import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

// const AddCabin = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => setShowModal(show => !show)}
//         variation="primary"
//         size="medium"
//       >
//         Add a new cabin
//       </Button>
//       {showModal && (
//         <Modal onCloseModal={() => setShowModal(false)}>
//           <CreateCabinForm onCloseModal={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variation="primary" size="medium">
            Add new cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
