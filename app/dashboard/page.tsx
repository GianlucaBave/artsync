'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CommissionRequest } from '@/types'

// Mock incoming requests for the artist
const mockRequests: CommissionRequest[] = [
  {
    id: 'req1',
    artistId: '1',
    artistName: 'Elena Martinez',
    size: 'medium',
    budget: 450,
    deadline: '2024-03-15',
    conceptImage: 'https://placehold.co/600x400?text=AI+Generated+Concept',
    description: 'A cyberpunk cat in neon rain, futuristic cityscape in the background',
    status: 'pending',
    createdAt: '2024-01-20',
  },
  {
    id: 'req2',
    artistId: '1',
    artistName: 'Elena Martinez',
    size: 'large',
    budget: 750,
    deadline: '2024-04-01',
    conceptImage: 'https://placehold.co/600x400?text=AI+Generated+Concept+2',
    description: 'Fantasy warrior with magical sword, epic landscape',
    status: 'pending',
    createdAt: '2024-01-19',
  },
]

export default function ArtistDashboard() {
  const [requests, setRequests] = useState<CommissionRequest[]>(mockRequests)

  const handleAccept = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' as const } : req
      )
    )
    alert('Commission accepted!')
  }

  const handleReject = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    )
    alert('Commission rejected.')
  }

  const pendingRequests = requests.filter(req => req.status === 'pending')

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Artist Dashboard</h1>
          <p className="text-gray-600">
            Manage your incoming commission requests
          </p>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No pending requests at the moment.</p>
            <Link href="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Browse marketplace →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingRequests.map(request => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Commission Request #{request.id.slice(-4)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Received on {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Pending
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Size:</span>
                      <span className="ml-2 text-gray-900 capitalize">{request.size}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Budget:</span>
                      <span className="ml-2 text-gray-900">${request.budget}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Deadline:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(request.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Description:</span>
                      <p className="mt-1 text-gray-900">{request.description}</p>
                    </div>
                  </div>

                  {request.conceptImage && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 mb-2 block">
                        AI Generated Concept:
                      </span>
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={request.conceptImage}
                          alt="Concept"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleReject(request.id)}
                    className="px-6 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="btn-primary"
                  >
                    Accept Commission
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accepted/Rejected Requests Section */}
        {requests.filter(req => req.status !== 'pending').length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {requests
                .filter(req => req.status !== 'pending')
                .map(request => (
                  <div
                    key={request.id}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        Request #{request.id.slice(-4)}
                      </span>
                      <span className="ml-2 text-gray-600">- ${request.budget}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
