import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TextEditor = ({ value, onChange }: Props) => {
  const modules = {
    toolbar: [
      // Basic styling
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],

      // Alignment & Lists
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],

      // Embeds
      ['link'],

      // Code & Quote
      ['blockquote', 'code-block'],

      // Remove formatting
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'align',
    'list', 'indent',
    'link',
    'blockquote', 'code-block',
  ];

  return (
    <div className="space-y-2">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-[300px] rounded-md border border-gray-300"
      />
    </div>
  );
};

export default TextEditor;
