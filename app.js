document.getElementById('videoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Invalid YouTube URL");
        return;
    }

    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (!response.ok) throw new Error("Unable to fetch video details");

        const data = await response.json();

        document.getElementById('thumbnail').src = data.thumbnail_url;
        document.getElementById('title').textContent = data.title;
        document.getElementById('videoDetails').style.display = 'block';
        
        // Simulated formats (YouTube restricts direct links)
        const formats = [
            { type: "MP4", quality: "720p", link: `https://www.youtube.com/watch?v=${videoId}` },
            { type: "MP4", quality: "480p", link: `https://www.youtube.com/watch?v=${videoId}` },
            { type: "MP3", quality: "Audio", link: `https://www.youtube.com/watch?v=${videoId}` }
        ];

        const formatsDiv = document.getElementById('formats');
        formatsDiv.innerHTML = '';
        formats.forEach(format => {
            const a = document.createElement('a');
            a.href = format.link;
            a.target = "_blank";
            a.textContent = `${format.type} - ${format.quality}`;
            formatsDiv.appendChild(a);
        });
    } catch (error) {
        alert("Failed to fetch video details");
        console.error(error);
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
