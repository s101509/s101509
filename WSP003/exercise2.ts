import fs from 'fs'
import path from 'path'

let target = 'C:\\Users\\wytam\\Documents\\TeckyCMS'

listAllJSRecursive('target').catch(function (err) {
	console.log(err)
})

async function listAllJSRecursive(filepath: string): Promise<void> {
	const files = await fs.promises.readdir(filepath)

	for (const file of files) {
		try {
			const stat = await fs.promises.stat(path.join(filepath, file))
			if (!stat.isDirectory()) {
				listAllJSRecursive(path.join(filepath, file))
			}
			if (!stat.isDirectory() && file.endsWith('.js')) {
				console.log(path.join(filepath, file))
			}
		} catch (e) {
			console.log(e)
		}
	}
}
