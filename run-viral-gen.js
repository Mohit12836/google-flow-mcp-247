import { LocalCore } from "./dist/core.js";

const core = new LocalCore();

console.log("Submitting video generation to Google Flow...");

const genResult = await core.generate({
  project: "viral-loop",
  scenes: [
    {
      type: "video",
      prompt: "Vertical 9:16 aspect ratio. Starts instantly with extreme fast terminal velocity freefall camera plunging downward through vibrant neon-lit sunset clouds. Heavy motion blur, instant adrenaline rush. Camera dives straight between colossal skyscrapers of a futuristic cyberpunk city with glowing neon holographic signs, slicing past flying vehicles, then plunges directly into a swirling cyan dimensional portal. The camera bursts out of the portal seamlessly right back into the identical clouds and downward freefall plunge. Continuous uninterrupted high-speed camera momentum, seamless loop: motion ends exactly where it started with identical velocity and angle, photorealistic 4K cinematic action.",
      aspect_ratio: "9:16",
      max_credits: 25,
      retries: 1
    }
  ]
});

console.log("Job queued successfully:", JSON.stringify(genResult, null, 2));

const jobId = genResult.jobs[0].id;
console.log(`Waiting for Job ${jobId} to process in Google Flow...`);

let done = false;
while (!done) {
  const waitResult = await core.wait({ job_ids: [jobId], timeout_seconds: 20 });
  const job = waitResult.jobs.find(j => j.id === jobId);
  console.log(`Job status: ${job?.status}, progress: ${job?.progress || 'processing'}, attempts: ${job?.attempts}`);
  
  if (waitResult.finished) {
    done = true;
    console.log("GENERATION_FINISHED!");
    console.log("Result files:", JSON.stringify(job?.files, null, 2));
    if (job?.error) {
      console.error("Job error:", job.error);
    }
  }
}

process.exit(0);
