import { CSSObject } from "create-emotion";

const TagStyle = (): CSSObject => ({
  alignItems: 'center',
  backgroundColor: '#dedace',
  borderRadius: 6,
  display: 'flex',
  fontSize: 12,
  justifyContent: 'space-between',
  marginRight: 4,
  minWidth: 30,
  padding: '4px 6px',
  width: 'max-content',

  '.tag-delete-btn': {
    borderLeft: '1px solid #a3a29e',
    display: 'inline-block',
    marginBottom: 2,
    marginLeft: 6,
    marginTop: 2,
    paddingLeft: 6,

    '&:hover': {
      color: '#c93c00',
    },
  },
});

export default TagStyle;
