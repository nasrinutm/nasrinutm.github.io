const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const formContainer = document.querySelector('.comments-section .form-container');
  if (formContainer) {
      formContainer.classList.toggle('dark-theme');
  }
  const commentsSection = document.querySelector('.comments-section');
  if (commentsSection) {
      commentsSection.classList.toggle('dark-theme');
  }
  toggleBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('dark-theme')) {
        const formContainer = document.querySelector('.comments-section .form-container');
        if (formContainer) {
            formContainer.classList.add('dark-theme');
        }
        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.classList.add('dark-theme');
        }
    }
)
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const commentStatusDiv = document.getElementById('comment-status');
    if (commentStatusDiv && status) { 
        if (status === 'comment_success') {
            commentStatusDiv.textContent = 'Comment submitted successfully!';
            commentStatusDiv.style.color = 'green';
        } else if (status === 'comment_error') {
            commentStatusDiv.textContent = 'Failed to submit comment. Please try again.';
            commentStatusDiv.style.color = 'red';
        } else if (status === 'db_connection_error') {
            commentStatusDiv.textContent = 'Database connection error. Please try again later.';
            commentStatusDiv.style.color = 'red';
        } else if (status === 'empty_fields') {
            commentStatusDiv.textContent = 'Name and comment cannot be empty.';
            commentStatusDiv.style.color = 'orange';
        }
    }


    const contactUrlParams = new URLSearchParams(window.location.search);
    const contactStatus = contactUrlParams.get('status');
    const contactStatusDiv = document.getElementById('contact-status');

    if (contactStatusDiv && contactStatus) { 
        if (contactStatus === 'contact_success') {
            contactStatusDiv.textContent = 'Message sent successfully!';
            contactStatusDiv.style.color = 'green';
        } else if (contactStatus === 'contact_error') {
            contactStatusDiv.textContent = 'Failed to send message. Please try again.';
            contactStatusDiv.style.color = 'red';
        } else if (contactStatus === 'contact_db_error') {
            contactStatusDiv.textContent = 'Database connection error. Please try again later.';
            contactStatusDiv.style.color = 'red';
        } else if (contactStatus === 'contact_empty_fields') {
            contactStatusDiv.textContent = 'Please fill in all contact fields.';
            contactStatusDiv.style.color = 'orange';
        }
    }

    function fetchComments() {
        const commentsContainer = document.getElementById('existing-comments-container');
        if (!commentsContainer) {
            return; 
        }

        fetch('comment.php') 
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        throw new Error(`Expected JSON but received: ${text.substring(0, 100)}...`);
                    });
                }
            })
            .then(data => {
                commentsContainer.innerHTML = ''; 

                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        data.forEach(comment => {
                            const commentDiv = document.createElement('div');
                            commentDiv.classList.add('comment');
                            commentDiv.innerHTML = `
                                <p><strong>${escapeHtml(comment.name)}</strong> says:</p>
                                <p>${nl2br(escapeHtml(comment.comment))}</p>
                                <p class="comment-meta">Posted on ${formatDate(comment.submission_date)}</p>
                            `;
                            commentsContainer.appendChild(commentDiv);
                        });
                    } else {
                        commentsContainer.innerHTML = "<p style='text-align: center;'>No comments yet. Be the first to comment!</p>";
                    }
                } else if (data && data.error) {
                    commentsContainer.innerHTML = `<p style="color: red; text-align: center;">Error loading comments: ${escapeHtml(data.error)}</p>`;
                } else {
                     commentsContainer.innerHTML = `<p style="color: red; text-align: center;">Unexpected response when loading comments.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                commentsContainer.innerHTML = `<p style="color: red; text-align: center;">Failed to load comments: ${error.message}</p>`;
            });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }

    function nl2br(text) {
        return text.replace(/\n/g, '<br>');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    fetchComments();
});