import type { Note } from "../types";

type Props = {
  note: Note;
  onArchived: (id: Note["id"]) => void;
  onDelete: (id: Note["id"]) => void;
  onEdit: (note: Note) => void;
};

export default function NoteCard({
  note,
  onArchived,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="card border-dark mb-3" data-testid="todo">
      <div className="card-header">Last edited: {note.lastEdited}</div>
      <div className="card-body">
        <h5 className="card-title mb-4">{note.title}</h5>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => onArchived(note.id)}>
            Archivar
          </button>
          <button className="btn btn-success" onClick={() => onEdit(note)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
