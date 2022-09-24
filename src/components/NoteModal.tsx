import type { Note } from "../types";
import "bootswatch/dist/cyborg/bootstrap.min.css";

type Props = {
  note: Partial<Note>;
  onClose: VoidFunction;
  onChange: (field: string, value: string) => void;
  onSave: VoidFunction;
};

export default function NoteModal({ note, onClose, onChange, onSave }: Props) {
  return (
    <div
      className="offcanvas offcanvas-start showing show"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      tabIndex={-1}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Create / Edit note
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Write your new tasks or modifiy the existing ones here.</p>
        <div>
          <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="title">
              Title
            </label>
            <input
              onChange={(event) => onChange("title", event.target.value)}
              value={note.title}
              type="text"
              className="form-control"
              placeholder="Title task"
              id="title"
            />

            <label htmlFor="content" className="form-label mt-4">
              Content
            </label>
            <textarea
              onChange={(event) => onChange("content", event.target.value)}
              value={note.content}
              className="form-control"
              id="content"
              placeholder="Content task"
            ></textarea>
          </div>
          <div className="d-flex justify-content-around mt-4">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button onClick={onSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}