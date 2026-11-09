# Lam’s Mom — Một ngày trên đồng cỏ

Open `index.html` via a static server. The site has no build step or external runtime dependencies. Scroll to move between four chapters. Use the playback toggle to pause or resume motion.

| Chapter | On-screen action | Footage |
| --- | --- | --- |
| 06:00 | Cattle graze in a wide field | [Jack Kazanjyan / Pexels](https://www.pexels.com/video/herd-of-cows-grazing-8264094/) |
| 12:00 | A cow drinks at a trough | [cottonbro studio / Pexels](https://www.pexels.com/video/a-cow-drinking-from-a-trough-in-a-field-4909956/) |
| 17:30 | A herd walks across an open field | [Luận Trần Văn / Pexels](https://www.pexels.com/video/a-herd-of-cattle-walking-through-a-field-16849444/) |
| 20:30 | Cattle rest on a hillside | [Sandro Müller / Pexels](https://www.pexels.com/video/cows-lying-on-grass-at-a-farm-4201895/) |

The owner’s pasture photo opens the experience and illustrates the story section. The four clips depict different locations and herds. Sunrise and sunset use warm color grades. The final scene is day-for-night color grading of genuine resting-cattle footage. The landscape and footage are illustrative and do not represent a verified supplier.

Footage is edited and integrated under the [Pexels license](https://www.pexels.com/license/). The scroll structure takes inspiration from [Halcyon](https://www.getlayers.ai/layer/halcyon). No Halcyon assets are included.

## Motion and delivery

- Sticky viewport with scroll-linked chapter selection. Each chapter plays a separate muted, inline loop and dissolves into the next.
- H.264 at 960 × 540, with audio removed and MP4 metadata at the start. Only the active clip plays. The next clip is prepared near its chapter, and playback pauses outside the hero or when the tab is hidden.
- The supplied photo and local WebP posters cover autoplay restrictions and media errors. Reduced-motion and Save-Data preferences start with stills. The playback control can opt into motion.
- The motion storyboard, visual direction and scoped repository review follow the project’s Motion Director, Visual Interactive Direction and Graphify Motion Workflow guidance.

## Verification

Checked in Chromium at desktop width and in a 390 px viewport. All four chapters played their respective clip, reverse scrolling returned to the opening chapter, and Enter toggled pause and playback. The mobile layout had no horizontal overflow. The four clips are approximately 660–710 KiB each. Physical devices and field performance were not measured.
