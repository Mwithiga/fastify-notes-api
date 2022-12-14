const NotesDAL = db => {
  const createNote = async (title, body) => {
    const { id } = await db.one(
      "INSERT INTO notes (title, body) VALUES($1, $2) RETURNING ID",
      [title, body]
    );
    return { id, title, body };
  };

  const getNotes = () => {
    return db.manyOrNone("SELECT id, title, body FROM notes");
  };

  const updateNote = async (id, title, body) => {
    await db.one(
      "UPDATE notes SET title=$1, body=$2 WHERE id = $3 RETURNING id",
      [title, body, id]
    );
    return { id, title, body };
  };

  const deleteNote = id => {
    return db.query("DELETE FROM notes WHERE id = $1", [id]);
  };

  return { createNote, getNotes, updateNote, deleteNote };
};

module.exports = NotesDAL;
