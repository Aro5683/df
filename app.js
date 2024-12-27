document.getElementById('videoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)");
        return;
    }

    // Redirect to a third-party downloader (e.g., y2mate, savefrom)
    const downloaderUrl = `https://y2mate.is/download-youtube/${videoId}`;
    window.open(downloaderUrl, '_blank');
});

function extractVideoId(url) {
    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&]+)/,
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1]; // The video ID
        }
    }

    return null; // If no match is found
}
