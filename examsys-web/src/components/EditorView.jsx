const EditorView = (props) => {
    const exam = props.exam;

    return (
        <p>Editor: {exam.name} </p>
    );
}

export default EditorView;