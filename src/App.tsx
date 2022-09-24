import "bootswatch/dist/cyborg/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import api from "./api";
import NoteCard from "./components/NoteCard";
import type { Note } from "./types";
import NoteModal from "./components/NoteModal";

function App() {
  const [notes, setNotes] = useState<Note[]>(api.notes.list);
  const [draft, setDraft] = useState<null | Partial<Note>>(null);
  const [view, setView] = useState<"active" | "archived">("active");
  const matches = useMemo(() => {
    return notes.filter((note) => {
      if (view == "active") {
        return !note.archived;
      } else if (view == "archived") {
        return note.archived;
      }
    });
  }, [notes, view]);

  function handleEdit(note: Note) {
    setDraft(note);
  }

  function handleDelete(id: Note["id"]) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }

  function handleArchive(id: Note["id"]) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;

        return {
          ...note,
          archived: !note.archived,
        };
      })
    );
  }

  function handleDraftChange(field: string, value: string) {
    setDraft((draft) => ({
      ...draft,
      [field]: value,
    }));
  }

  function handleSave() {
    if (draft?.id) {
      setNotes((notes) =>
        notes.map((note) => {
          if (note.id !== draft.id) return note;

          return {
            ...draft,
            lastEdited: new Date().toLocaleDateString(),
          } as Note;
        })
      );
    } else {
      setNotes((notes) =>
        notes.concat({
          id: String(+new Date()),
          lastEdited: new Date().toLocaleDateString(),
          ...(draft as Omit<Note, "id" | "lastEdited">),
        })
      );
    }
    setDraft(null);
  }

  useEffect(() => {
    api.notes.set(notes);
  }, [notes]);

  return (
    <main className="d-flex flex-column">
      <div className="text-center mb-5">
        <h2 className="fw-bold">MY NOTES</h2>
        <div className="d-flex justify-content-center gap-5">
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            onClick={() => setDraft({})}
            className="btn btn-primary"
          >
            New note
          </button>
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            className="btn btn-secondary"
            onClick={() =>
              setView((view) => (view == "active" ? "archived" : "active"))
            }
          >
            {view == "active" ? "Archived notes" : "Active notes"}
          </button>
        </div>
      </div>
      <div className="d-flex gap-3 flex-wrap">
        {matches.length ? (
          matches.map((nota) => (
            <NoteCard
              onEdit={handleEdit}
              onDelete={handleDelete}
              onArchived={handleArchive}
              key={nota.id}
              note={nota}
            />
          ))
        ) : (
          <p>No notes!</p>
        )}
        {draft && (
          <NoteModal
            onSave={handleSave}
            onChange={handleDraftChange}
            note={draft}
            onClose={() => setDraft(null)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
