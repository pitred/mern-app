const cutText = (content, maxLength) => {
   if (content.length < 1) return 'Error';
   if (content.length <= maxLength) return content;
   return content.substr(0, maxLength) + '...';
};

export default cutText;
