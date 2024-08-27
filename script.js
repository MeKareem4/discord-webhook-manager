document.getElementById('submit-webhook').addEventListener('click', () => {
  const webhookUrl = document.getElementById('webhook-url').value;

  if (webhookUrl) {
      document.getElementById('webhook-input').style.display = 'none';
      document.getElementById('webhook-manager').style.display = 'block';
      localStorage.setItem('webhookUrl', webhookUrl);
  } else {
      alert('Please enter a valid webhook URL');
  }
});

document.getElementById('send-message').addEventListener('click', () => {
  const message = prompt('Enter your message:');
  const webhookUrl = localStorage.getItem('webhookUrl');

  if (message && webhookUrl) {
      fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: message })
      });
      alert('Message sent!');
  }
});

document.getElementById('send-file').addEventListener('click', () => {
  const webhookUrl = localStorage.getItem('webhookUrl');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      await fetch(webhookUrl, {
          method: 'POST',
          body: formData
      });

      alert('File sent!');
  });

  fileInput.click();
});

document.getElementById('change-name').addEventListener('click', () => {
  const newName = prompt('Enter new webhook name:');
  const webhookUrl = localStorage.getItem('webhookUrl');

  if (newName && webhookUrl) {
      fetch(webhookUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName })
      });
      alert('Webhook name changed!');
  }
});

document.getElementById('change-avatar').addEventListener('click', () => {
  const webhookUrl = localStorage.getItem('webhookUrl');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.jpg, .png';

  fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];

      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = async () => {
              await fetch(webhookUrl, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ avatar: reader.result })
              });

              alert('Avatar changed!');
          };
      } else {
          alert('Invalid file type. Only .jpg and .png are allowed.');
      }
  });

  fileInput.click();
});

document.getElementById('delete-webhook').addEventListener('click', () => {
  const webhookUrl = localStorage.getItem('webhookUrl');
  const confirmUrl = prompt('Please paste the webhook URL to confirm deletion:');

  if (confirmUrl === webhookUrl) {
      fetch(webhookUrl, { method: 'DELETE' });
      alert('Webhook deleted!');
  } else {
      alert('Webhook URLs do not match.');
  }
});
