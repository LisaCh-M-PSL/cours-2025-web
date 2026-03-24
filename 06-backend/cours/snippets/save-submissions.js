const dataFile = "./submissions.json"

async function loadSubmissions() {
  try {
    return JSON.parse(await Bun.file(dataFile).text())
  } catch {
    return []
  }
}

async function saveSubmission(entry) {
  const submissions = await loadSubmissions()
  submissions.push({ ...entry, createdAt: new Date().toISOString() })
  await Bun.write(dataFile, JSON.stringify(submissions, null, 2))
}
