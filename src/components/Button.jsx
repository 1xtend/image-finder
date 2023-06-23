function Button({ onLoadMore }) {
  return (
    <button type="button" onClick={onLoadMore} className="Button">
      Load More
    </button>
  );
}
export default Button;
