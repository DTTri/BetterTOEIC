import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingProgress() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-500 bg-opacity-50 flex items-center justify-center">
      <CircularProgress size="3rem" color='primary'/>
    </div>
  )
}
