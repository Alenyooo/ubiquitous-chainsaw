# Twitch → TikTok clipping pipeline

| Folder | Contents |
|---|---|
| Recordings/ | Raw VOD audio/video sections used for analysis (git-ignored, large) |
| Raw_Clips/ | Downloaded viewer clips per streamer (git-ignored) |
| Edited_Clips/ | Finished 1080×1920 / 60 fps / H.264 clips, ready to post |
| Published/ | Clips confirmed published on TikTok (empty — see blocker below) |
| Rejected/ | (moments rejected are listed in Logs/rejected.md) |
| Logs/ | tracking.csv, rejected.md, captions_cycle1.md, project_files/ (subtitle + ffmpeg command per clip) |

## Status (cycle 1, 21 Nov 2026)
- Monitoring/recording: works for all 5 channels (public VODs + viewer clips).
- **Publishing: BLOCKED.** This session has no browser, no TikTok connector and no attached computer, so there is no authenticated TikTok session to use. Nothing has been published; `Published/` is empty and every row in tracking.csv says NOT PUBLISHED.
- Chat replay download is blocked by the session's permission system; viewer-clip view counts + audio spikes + transcripts are used instead.
