(function registerPublishedArticleWidget() {
  const PublishedArticleControl = window.createClass({
    render: function render() {
      const value = this.props.value;
      const displayedValue =
        typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided";

      return window.h(
        "div",
        {
          className: this.props.classNameWrapper,
          style: {
            background: "#f4f8fb",
            border: "1px solid #c9d8e6",
            borderRadius: "6px",
            color: "#112b46",
            lineHeight: "1.6",
            padding: "12px 14px",
            whiteSpace: "pre-wrap",
          },
        },
        displayedValue,
      );
    },
  });

  window.CMS.registerWidget("published-readonly", PublishedArticleControl);
})();
